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
    displayingRightChoice: boolean,
    choice: number,
    games: {
        won: number,
        lost: number
    },
    timeLeft: number
}

type Props = Record<string, never>;

export default class TimeRush extends React.Component<Props, State> {

    public timeoutStore: NodeJS.Timer | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            ...defaultCommonState('timeRush', { bestTimeIfNone: Number.POSITIVE_INFINITY }),
            won: false,
            displayingRightChoice: false,
            choice: -1,
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
            choice: -1,
            timeLeft: 60
        });
    }

    endGame(won: boolean) {
        const time = Date.now() - this.state.start;

        const isNewBest = won && time < this.state.bestTime;
        this.setState({
            won: won,
            displayingRightChoice: true,
            time: won ? time : 0,
            bestTime: isNewBest ? time : this.state.bestTime,
            newRecord: isNewBest,
            games: {
                lost: this.state.games.lost + (won ? 0 : 1),
                won: this.state.games.won + (won ? 1 : 0)
            }
        }, () => {
            window.localStorage.setItem('timeRush.lost', this.state.games.lost.toString());
            window.localStorage.setItem('timeRush.best', this.state.bestTime.toString());
            window.localStorage.setItem('timeRush.won', this.state.games.won.toString());
            logEvent(analytics, 'time_rush_finished');
    
            this.timeoutStore = setTimeout(() => this.setState({ displayingRightChoice: false }), 5*1000);
        });
    }

    click(left: boolean, idx: number) {
        if(this.state.displayingRightChoice) {
            if(this.timeoutStore) clearTimeout(this.timeoutStore);
            this.timeoutStore = null;
            this.setState({ displayingRightChoice: false });
            return;
        }
        const num = (left ? this.state.left : this.state.right)[idx];
        this.setState({ choice: num });
        const won = num == this.state.number;
        this.endGame(won);
    }

    componentDidMount() {
        setInterval(() => {
            if(!this.state.displayingRightChoice && this.state.won == null) this.setState({
                timeLeft: (this.state.start + 60 * 1000) - Date.now()
            }, () => {
                if(this.state.won == null && this.state.timeLeft <= 0) setTimeout(this.endGame.bind(this, false));
            });
        }, 10);
    }

    render(): React.ReactNode {
        return (
            <div id='time-rush'>
                {
                    this.state.won == null || this.state.displayingRightChoice ? (
                        <>
                            <GamemodeUiComponent
                                left={this.state.left}
                                right={this.state.right}
                                timeLeft={this.state.timeLeft}
                                click={this.click.bind(this)}
                                coloring={[
                                    { n: this.state.displayingRightChoice ? this.state.number : -1, color: 'green' },
                                    { n: (this.state.won != null && this.state.won) ? -1 : this.state.choice, color: 'red' }
                                ]}
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