import { useIntervall } from '../hooks/use-interval';
import { useEffect, useState } from 'react';

import { Button } from './botton';
import { Timer } from './timer';

// for sounds
// eslint-disable-next-line @typescript-eslint/no-var-requires
import bellStart from '../sounds/bell-start.mp3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import bellFinish from '../sounds/bell-finish.mp3';
import { secondsTotime } from '../utils/second-to-time';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}
export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTimer);
  const [timeCounting, setTimerCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPormodoros, setnumberOfPormodoros] = useState(0);

  //

  //

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

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    // logic of rest

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if (working) setnumberOfPormodoros(numberOfPormodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPormodoros,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
    completedCycles,
  ]);
  //

  useIntervall(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  //

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
        <p>Ciclos concluidos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsTotime(fullWorkingTime)}</p>
        <p>Pomodoros concluidos: {completedCycles}</p>
      </div>
    </div>
  );
}
