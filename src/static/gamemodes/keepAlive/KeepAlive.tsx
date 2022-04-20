import * as React from 'react';
import './KeepAlive.scss';
import { logEvent } from 'firebase/analytics';
import { randomArray, randomNumber } from '../../../common/utils/RandomUtils';
import { arrayContainArrayElement, arrayContainElement } from '../../../common/utils/ArrayUtils';
import { analytics } from '../..';
import { Link } from 'react-router-dom';

type State = {
    left: number[],
    right: number[],
    number: number,
    start: number,
    time: number,
    bestTime: number,
    newRecord: boolean,
    finished: boolean,
    timeLeft: number,
    timeAddition: number
};

type Props = Record<string, never>;

export default class KeepAlive extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            left: [],
            right: [],
            number: -1,
            start: Date.now(),
            time: 0,
            bestTime: Number(window.localStorage.getItem('keepAlive.best')) || 0,
            newRecord: false,
            finished: true,
            timeLeft: 60,
            timeAddition: 0
        };
    }

    resetGame() {
        let left = randomArray(12);
        let right = randomArray(12);

        while(arrayContainArrayElement(left, right)) {
            left = randomArray(12);
            right = randomArray(12);
        }

        let number = randomNumber();

        while(arrayContainElement(number, [ ...left, ...right ])) number = randomNumber();

        const posLeft = Math.floor(Math.random() * 8 + 1);
        const posRight = Math.floor(Math.random() * 8 + 1);

        left[posLeft] = number;
        right[posRight] = number;

        this.setState({
            left: left,
            right: right,
            number: number
        });
        
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
                            <div id='header'>
                                <p id='time-left'>Time left: {Math.round(this.state.timeLeft / 1000)}s</p>
                            </div>
                            <div id='game-main'>
                                <div id='left' className='container'>
                                    {
                                        this.state.left.map((n, idx) => {
                                            return (
                                                <h1 className='number' key={idx} onClick={ () => this.click(true, idx) }>{n}</h1>
                                            );
                                        })
                                    }
                                </div>
                                <div id='right' className='container'>
                                    {
                                        this.state.right.map((n, idx) => {
                                            return (
                                                <h1 className='number' key={idx} onClick={ () => this.click(false, idx) }>{n}</h1>
                                            );
                                        })
                                    }
                                </div>
                            </div>
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