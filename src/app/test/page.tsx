// src/app/test/page.tsx

"use client";


import React from 'react';

export default function TestPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Text Selection & Context Menu Test Page</h1>
      
      <div className="space-y-8">
        {/* Non-selectable text section */}
        <section className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Non-selectable Text</h2>
          <p className="mb-3">
            This paragraph should not be selectable. Try to select this text - it should not work.
            Right-clicking here should NOT show any context menu.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at magna vitae nunc
            commodo posuere. Duis eget felis non nisl fermentum rhoncus.
          </p>
        </section>

        {/* Selectable input elements */}
        <section className="p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Selectable Input Elements</h2>
          <p className="text-sm text-blue-600 mb-3 font-medium">
            Right-click on any input below to see the custom context menu with only Copy & Paste options.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="textInput" className="block mb-1 font-medium">Text Input:</label>
              <input
                id="textInput"
                type="text"
                placeholder="This text should be selectable"
                className="w-full p-2 border rounded"
                defaultValue="Try selecting this text and right-click to see custom menu"
              />
            </div>
            
            <div>
              <label htmlFor="textArea" className="block mb-1 font-medium">Text Area:</label>
              <textarea
                id="textArea"
                rows={3}
                placeholder="This text area content should be selectable"
                className="w-full p-2 border rounded"
                defaultValue="You should be able to select this text and use the custom context menu with Copy & Paste options. This demonstrates that our implementation is working correctly."
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Contenteditable Div:</label>
              <div
                contentEditable="true"
                className="w-full p-2 border rounded min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressContentEditableWarning={true}
              >
                This is an editable div. You should be able to select text here and use the custom context menu.
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Testing Instructions</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Try to select text in the gray section (should not work)</li>
            <li>Right-click on the gray section (no context menu should appear)</li>
            <li>Select text in any input field (should work)</li>
            <li>Right-click on selected text in input fields (custom Copy & Paste menu should appear)</li>
          </ol>
        </section>
      </div>
    </div>
  );
}