import * as React from 'react';
import './TimeRush.scss';
import { analytics } from '../..';
import { logEvent } from 'firebase/analytics';
import { Link } from 'react-router-dom';
import { getNewListsAndNumber } from '../../../common/utils/MainUtils';
import { CommonState, defaultCommonState } from '../../../common/utils/StateUtils';
import GamemodeUiComponent from '../GamemodeUi';

interface State extends CommonState {
    won: null | boolean,
    games: {
        won: number,
        lost: number
    },
    timeLeft: number
}

type Props = Record<string, never>;

export default class TimeRush extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            ...defaultCommonState('timeRush', { bestTimeIfNone: Number.POSITIVE_INFINITY }),
            won: false,
            games: {
                won: Number(window.localStorage.getItem('timeRush.won')) || 0,
                lost: Number(window.localStorage.getItem('timeRush.lost')) || 0
            },
            timeLeft: 60
        };
    }

    async resetGame() {
        this.setState({
            ...getNewListsAndNumber(),
            start: Date.now(),
            time: 0,
            newRecord: false,
            won: null,
            timeLeft: 60
        });
    }

    lose() {
        this.setState({
            won: false,
            games: {
                lost: this.state.games.lost + 1,
                won: this.state.games.won
            }
        }, () => {
            window.localStorage.setItem('timeRush.lost', this.state.games.lost.toString());
            logEvent(analytics, 'time_rush_finished');
        });
    }

    win(time: number) {
        this.setState({
            won: true,
            time: time,
            bestTime: time < this.state.bestTime ? time : this.state.bestTime,
            newRecord: time < this.state.bestTime,
            games: {
                lost: this.state.games.lost,
                won: this.state.games.won + 1
            }
        }, () => {
            window.localStorage.setItem('timeRush.best', this.state.bestTime.toString());
            window.localStorage.setItem('timeRush.won', this.state.games.won.toString());
            logEvent(analytics, 'time_rush_finished');
        });
    }

    click(left: boolean, idx: number) {
        if((left ? this.state.left : this.state.right)[idx] != this.state.number) return this.lose();
        const time = Date.now() - this.state.start;
        this.win(time);
    }

    getTimeLeft() {
        return ((this.state.start + 60 * 1000) - Date.now());
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                timeLeft: this.getTimeLeft()
            }, () => {
                if(this.state.won == null && this.state.timeLeft <= 0) setTimeout(this.lose.bind(this));
            });
        }, 10);
    }

    render(): React.ReactNode {
        return (
            <div id='time-rush'>
                {
                    this.state.won == null ? (
                        <>
                            <GamemodeUiComponent
                                left={this.state.left}
                                right={this.state.right}
                                timeLeft={this.state.timeLeft}
                                click={this.click.bind(this)}
                            />
                        </>
                    ) : (
                        <div id='end' style={{ backgroundColor: this.state.won ? '#145c14' : '#5c1414' }}>
                            <h1 style={{ visibility: this.state.won ? 'visible' : 'hidden' }} id='time'>
                                {this.state.newRecord ? 'New Best Time ' : ''}{this.state.time / 1000}s
                            </h1>
                            <h1 id='ratio'>
                                Ratio: {this.state.games.won}W/{this.state.games.lost}L ({Math.round((this.state.games.won / (this.state.games.won + this.state.games.lost)) * 100) || '100'}%)
                            </h1>
                            <div id='buttons'>
                                <button onClick={() => this.resetGame()} id='new-game' className='button'>New game</button>
                                <Link to='/' id='Home' className='button'>Home</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

}