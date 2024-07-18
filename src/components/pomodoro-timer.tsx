import { useIntervall } from '../hooks/use-interval';
import React from 'react';

import { Button } from './botton';
import { Timer } from './timer';

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
      <Timer mainTime={mainTime} />
      <Button text="teste" onClick={() => console.log(1)}></Button>
    </div>
  );
}
