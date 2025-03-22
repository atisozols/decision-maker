const DecisionMatrix = ({ decision, scores }) => {
  return (
    <div
      className="overflow-x-auto text-xs lg:text-base font-thin"
      style={{ marginBottom: "20vh" }}
    >
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left"></th>
            <th className="border p-2 font-extralight">Kopā</th>
            {decision.criteria.map((criterion, cIdx) => (
              <th key={cIdx} className="border p-2 font-extralight">
                {criterion} ({cIdx + 1})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {decision.options
            .map((option, oIdx) => ({
              option,
              score: scores[oIdx],
              originalIndex: oIdx,
            }))
            .sort((a, b) => b.score - a.score)
            .map(({ option, score, originalIndex }, idx) => (
              <tr key={idx}>
                <td className="border p-2 font-semibold">{option}</td>
                <td className="border p-2 font-black">{score}</td>
                {decision.criteria.map((criterion, cIdx) => {
                  const key = `${originalIndex}-${cIdx}`;
                  return (
                    <td key={key} className="border p-2">
                      {decision.weights[key]
                        ? parseInt(decision.weights[key], 10) *
                          (decision.criteria.length - cIdx)
                        : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <p className="mt-4 lg:text-lg font-thin">
        Prioritāte tiek izmantota kā svars, aprēķinot rezultātu
      </p>
    </div>
  );
};

export default DecisionMatrix;
