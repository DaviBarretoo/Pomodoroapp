import { useIntervall } from '../hooks/use-interval';
import React, { useEffect } from 'react';

import { Button } from './botton';
import { Timer } from './timer';

// for sounds
// eslint-disable-next-line @typescript-eslint/no-var-requires
import bellStart from '../sounds/bell-start.mp3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import bellFinish from '../sounds/bell-finish.mp3';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}
export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTimer);
  const [timeCounting, setTimerCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  const [resting, setResting] = React.useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  const configureWork = (postivevalue: boolean): void => {
    setTimerCounting(postivevalue),
      setWorking(postivevalue),
      setResting(false),
      setMainTime(props.pomodoroTimer);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean): void => {
    setTimerCounting(true), setWorking(false), setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
    audioStopWorking.play();
  };
  useIntervall(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork(true)}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'pause' : 'play'}
          onClick={() => setTimerCounting(!timeCounting)}
        ></Button>
      </div>
      <div className="details">
        <p> Testando</p>
      </div>
    </div>
  );
}
