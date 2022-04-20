import * as React from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
type State = {
    timeRush: number,
    keepAlive: number
};

type Props = Record<string, never>;

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            timeRush: Number(window.localStorage.getItem('timeRush.best')) || -1,
            keepAlive: Number(window.localStorage.getItem('keepAlive.best')) || -1
        };
    }

    render(): React.ReactNode {
        return (
            <>
                <Link to='/time-rush' id='time-rush-link' className='link'>
                    <h1>Time Rush</h1>
                    <h2>{this.state.timeRush < 0 ? 'No Record' : `Best: ${this.state.timeRush / 1000}s`}</h2>
                </Link>
                <Link to='/keep-alive' id='keep-alive-link' className='link'>
                    <h1>Keep Alive</h1>
                    <h2>{this.state.keepAlive < 0 ? 'No Record' : `Best: ${this.state.keepAlive / 1000}s`}</h2>
                </Link>
            </>
        );
    }

}