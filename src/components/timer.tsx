import { secondsTotime } from '../utils/second-to-time';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{secondsTotime(props.mainTime)}</div>;
}
