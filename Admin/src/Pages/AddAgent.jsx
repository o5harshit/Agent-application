import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { CREATE_AGENT } from "@/utils/constants";

/**
 * AddAgentPage – A vibrant form for admins to create new agents
 * Uses Tailwind CSS + ShadCN UI + Framer‑Motion
 */
export default function AddAgentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiClient.post(CREATE_AGENT,{name : form.name,email : form.email,password : form.password,mobile : form.mobile},{withCredentials:true});
    if(response.data.success){
        toast.success("Agent created successfully 🚀");  
    setForm({ name: "", email: "", mobile: "", password: "" });
    } else {
        toast.error("Something went wrong!Try Again");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_25%_25%,theme(colors.purple.600)_0%,theme(colors.indigo.800)_100%)] flex items-center justify-center p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          Create New Agent
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile (with country code)</Label>
            <Input
              id="mobile"
              placeholder="+91 9876543210"
              value={form.mobile}
              onChange={handleChange("mobile")}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange("password")}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold tracking-wide cursor-pointer"
          >
            Add Agent
          </Button>
        </form>
      </motion.div>
    </div>
  );
}