/*
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Tailwind CSS Test
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Tailwind が正しく動作しています！
      </p>
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        ボタンテスト
      </button>
      <div className="mt-6 w-32 h-32 bg-red-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default App;*/

import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
