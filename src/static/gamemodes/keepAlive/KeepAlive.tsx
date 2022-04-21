import * as React from 'react';
import './KeepAlive.scss';
import { logEvent } from 'firebase/analytics';
import { getNewListsAndNumber } from '../../../common/utils/MainUtils';
import { CommonState, defaultCommonState } from '../../../common/utils/StateUtils';
import { analytics } from '../..';
import { Link } from 'react-router-dom';
import GamemodeUiComponent from '../GamemodeUi';

interface State extends CommonState {
    finished: boolean,
    timeLeft: number,
    timeAddition: number
}

type Props = Record<string, never>;

export default class KeepAlive extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            ...defaultCommonState('keepAlive'),
            finished: true,
            timeLeft: 60,
            timeAddition: 0
        };
    }

    resetGame() {
        this.setState(getNewListsAndNumber());
    }

    async fullReset() {
        this.resetGame();
        this.setState({
            start: Date.now(),
            time: 0,
            newRecord: false,
            finished: false,
            timeLeft: 60,
            timeAddition: 0
        });
    }

    finishGame() {
        const time = Date.now() - this.state.start;
        this.setState({
            finished: true,
            time: time,
            bestTime: time > this.state.bestTime ? time : this.state.bestTime,
            newRecord: time > this.state.bestTime
        }, () => {
            window.localStorage.setItem('keepAlive.best', this.state.bestTime.toString());
            logEvent(analytics, 'keep_alive_finished');
        });
    }

    lose() {
        this.setState({
            timeAddition: this.state.timeAddition - 10
        }, () => {
            this.resetGame();
        });
    }

    win() {
        this.setState({
            timeAddition: this.state.timeAddition + 10
        }, () => {
            this.resetGame();
        });
    }

    click(left: boolean, idx: number) {
        if((left ? this.state.left : this.state.right)[idx] != this.state.number) return this.lose();
        this.win();
    }

    getTimeLeft() {
        return ((this.state.start + 60 * 1000) - Date.now()) + this.state.timeAddition * 1000;
    }

    componentDidMount() {
        setInterval(() => {
            if(!this.state.finished) this.setState({
                timeLeft: this.getTimeLeft()
            }, () => {
                if(!this.state.finished && this.state.timeLeft <= 0) setTimeout(this.finishGame.bind(this));
            });
        }, 10);
    }

    render(): React.ReactNode {
        return (
            <div id='keep-alive'>
                {
                    !this.state.finished ? (
                        <>
                            <GamemodeUiComponent
                                left={this.state.left}
                                right={this.state.right}
                                timeLeft={this.state.timeLeft}
                                click={this.click.bind(this)}
                            />
                        </>
                    ) : (
                        <div id='end'>
                            <h1 id='time'>
                                {this.state.newRecord ? 'New Best Time ' : ''}{this.state.time / 1000}s
                            </h1>
                            <div id='buttons'>
                                <button onClick={() => this.fullReset()} id='new-game' className='button'>New game</button>
                                <Link to='/' id='Home' className='button'>Home</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

}