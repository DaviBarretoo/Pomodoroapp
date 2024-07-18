import { useIntervall } from '../hooks/use-interval';
import React from 'react';
import { secondsTotime } from '../utils/second-to-time';
import { Button } from './botton';

interface Props {
  defaultPomodoroTimer: number;
}
export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);

  useIntervall(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Button text="teste"> </Button>
    </div>
  );
}
