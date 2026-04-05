import { HashRouter, Routes, Route } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { HomeScreen } from './components/layout/HomeScreen';
import { TutorialMode } from './components/modes/tutorial/TutorialMode';
import { ConverterMode } from './components/modes/converter/ConverterMode';
import { ChallengeMode } from './components/modes/challenge/ChallengeMode';
import { MatchMode } from './components/modes/match/MatchMode';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomeScreen />} />
          <Route path="tutorial" element={<TutorialMode />} />
          <Route path="converter" element={<ConverterMode />} />
          <Route path="challenge" element={<ChallengeMode />} />
          <Route path="match" element={<MatchMode />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
