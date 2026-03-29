interface QuickAnswerProps {
  children: React.ReactNode;
}

export function QuickAnswer({ children }: QuickAnswerProps) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl px-5 py-4 mb-8">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
        Quick Answer
      </p>
      <div className="text-sm text-gray-700 leading-relaxed font-medium">
        {children}
      </div>
    </div>
  );
}

interface KeyTakeawaysProps {
  items: string[];
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 mt-10 mb-6">
      <h2 className="text-base font-bold text-gray-900 mb-3">
        Key Takeaways
      </h2>
      <ol className="list-decimal list-inside space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-600 leading-relaxed">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
