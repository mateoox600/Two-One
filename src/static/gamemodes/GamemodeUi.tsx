import * as React from 'react';
import './GamemodeUi.scss';

interface Props {
    left: number[],
    right: number[],
    timeLeft: number,
    click: (left: boolean, idx: number) => void
}

type State = Record<string, never>;

export default class GamemodeUiComponent extends React.Component<Props, State> {

    render() {
        return (
            <>
                <div id='header'>
                    <p id='time-left'>Time left: {Math.round(this.props.timeLeft / 1000)}s</p>
                </div>
                <div id='game-main'>
                    <div id='left' className='container'>
                        {
                            this.props.left.map((n, idx) => {
                                return (
                                    <h1 className='number' key={idx} onClick={ () => this.props.click(true, idx) }>{n}</h1>
                                );
                            })
                        }
                    </div>
                    <div id='right' className='container'>
                        {
                            this.props.right.map((n, idx) => {
                                return (
                                    <h1 className='number' key={idx} onClick={ () => this.props.click(false, idx) }>{n}</h1>
                                );
                            })
                        }
                    </div>
                </div>
            </>
        );
    }

}