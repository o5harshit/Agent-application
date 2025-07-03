import React, { useEffect, useState } from "react";
import AgentLeadsTable from "@/Components/AgentLeadsTable";
 // adjust the path to your apiClient
import { LEADER_BOARD } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
 // adjust if endpoint is defined elsewhere

export default function LeadsBoard() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(LEADER_BOARD, {
          withCredentials: true,
        });
        if (data.success) {
          setAgents(data.agents);
        }
      } catch (error) {
        console.error("Error fetching leads board:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p style={{ padding: "1rem" }}>Loading…</p>;

  return <AgentLeadsTable agents={agents} />;
}
