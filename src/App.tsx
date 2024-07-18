import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <>
      <div>
        <PomodoroTimer defaultPomodoroTimer={1500} />
        <p>Deus é fiel</p>
      </div>
    </>
  );
}

export default App;
