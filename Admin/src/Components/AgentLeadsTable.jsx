import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";


export default function AgentLeadsTable({ agents = [] }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Helper to derive admin display name gracefully
  const getAdminName = (agent) =>
    agent.adminName || agent.createdBy || agent.adminId || "—";

  return (
    <Card className="w-full p-4">
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Agent Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Total Leads</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <>
                {/* Main row */}
                <TableRow key={agent._id} className="hover:bg-muted/10">
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.mobile}</TableCell>
                  <TableCell>{getAdminName(agent)}</TableCell>
                  <TableCell>{agent.leads?.length || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => toggle(agent._id)}
                      size="sm"
                      className="gap-1"
                    >
                      {openId === agent._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      {openId === agent._id ? "Hide" : "View"} Tasks
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expandable lead list */}
                {openId === agent._id && (
                  <TableRow key={`${agent._id}-details`} className="bg-muted/20">
                    <TableCell colSpan={6} className="p-4">
                      <Table className="w-full border border-border rounded-md">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Lead Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Note / Task</TableHead>
                            <TableHead>Created At</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {agent.leads.map((lead) => (
                            <TableRow key={lead._id}>
                              <TableCell>{lead.firstName}</TableCell>
                              <TableCell>{lead.phone}</TableCell>
                              <TableCell>{lead.notes}</TableCell>
                              <TableCell>{new Date(lead.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
