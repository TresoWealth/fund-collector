import { FundDataCollector } from './components/FundDataCollector';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-white border-b-4 border-[#00ffa3]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center">
          <img src="/treso-logo.png" alt="TresoWealth" className="h-12" />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <FundDataCollector />
      </main>
    </div>
  );
}
export default App;