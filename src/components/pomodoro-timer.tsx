import { useIntervall } from '../hooks/use-interval';
import React from 'react';

interface Props {
  defaultPomodoroTimer: number;
}
export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);

  useIntervall(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return <div>Ola mundo {mainTime}</div>;
}
