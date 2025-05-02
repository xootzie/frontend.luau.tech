'use client';
import { useEffect, useState } from 'react';
import { Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';

interface TestResult {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface TestData {
  results: TestResult[];
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    successRate: number;
    executionTime: number;
    version: string;
    contributors: string[];
  };
  lastUpdated: number;
}

const TestResultsPage = () => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await fetch('/unc/solara.txt');
        if (!response.ok) throw new Error('Failed to load test results');
        
        const text = await response.text();
        const parsedData = parseTestResults(text);
        setTestData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load test results');
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  const parseTestResults = (text: string): TestData => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const results: TestResult[] = [];
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    let executionTime = 0;
    let version = '';
    let contributors: string[] = [];

    lines.forEach(line => {
      if (line.includes('✅')) {
        results.push({ type: 'success', message: line.replace('✅', '').trim() });
        passedTests++;
      } else if (line.includes('❌')) {
        results.push({ type: 'error', message: line.replace('❌', '').trim() });
        failedTests++;
      } else if (line.includes('❗')) {
        results.push({ type: 'info', message: line.replace('❗', '').trim() });
      }

      if (line.includes('VERSION')) {
        version = line.trim();
      }
      if (line.includes('Contributors:')) {
        contributors = line.replace('Contributors:', '').trim().split(',').map(c => c.trim());
      }
      if (line.includes('seconds')) {
        executionTime = parseFloat(line.match(/\d+\.\d+/)?.[0] ?? '0');
      }
    });

    totalTests = passedTests + failedTests;
    const successRate = (passedTests / totalTests) * 100;

    return {
      results,
      summary: {
        totalTests,
        passedTests,
        failedTests,
        successRate,
        executionTime,
        version,
        contributors
      },
      lastUpdated: Math.floor(Date.now() / 1000)
    };
  };

  if (loading) {
    
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      </div>
    );
  }

  if (!testData) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
    
            <Navbar />
      <LoadingScreen onComplete={() => {
        console.log('Page fully loaded');
      }}/>
      <div className="mt-48 max-w-4xl mx-auto">
    
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Solara sUNC Test Results</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="mt-1 w-4 h-4" />
            <span>Last Updated: 2/11/2025, 2:09 PM EST</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {testData.summary.successRate.toFixed(1)}%
              </div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-2xl font-bold">
                {testData.summary.passedTests}/{testData.summary.totalTests}
              </div>
              <div className="text-gray-400">Tests Passed</div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-2xl font-bold text-red-500">
                {testData.summary.failedTests}
              </div>
              <div className="text-gray-400">Tests Failed</div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-xl p-6 mb-8 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Test Results</h2>
          <div className="space-y-2">
            {testData.results.map((result, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-3 bg-zinc-800/50 rounded-lg"
              >
                {result.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {result.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                {result.type === 'info' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                <span className={
                  result.type === 'success' ? 'text-green-500' :
                  result.type === 'error' ? 'text-red-500' :
                  'text-yellow-500'
                }>
                  {result.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
          <p className="text-gray-400">{testData.summary.version}</p>
          <p className="text-gray-400"> {testData.summary.contributors.join(', ')}</p>
          <p className="text-gray-400">Test completed in {testData.summary.executionTime} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;