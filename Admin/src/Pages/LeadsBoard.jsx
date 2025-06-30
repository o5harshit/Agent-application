import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { LEADER_BOARD } from "@/utils/constants";

const LeadsBoard = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await apiClient.get(LEADER_BOARD, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success) setAgents(data.agents);
    })();
  }, []);

  return (
    <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div
          key={agent._id}
          className="rounded-xl border bg-white p-4 shadow-md min-w-[250px] max-w-xs"
        >
          <h2 className="text-lg font-semibold text-purple-700 mb-2">
            {agent.name}
          </h2>
          {agent.leads.length === 0 ? (
            <p className="text-gray-500 text-sm">No leads assigned</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {agent.leads.map((lead, idx) => (
                <li key={idx}>
                  <span className="font-medium">{lead.firstName}</span> —{" "}
                  <span>{lead.phone}</span>
                  <div className="text-xs text-gray-500 italic">
                    {lead.notes}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeadsBoard;
