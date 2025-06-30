import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { motion } from "framer-motion";
import { UPLOAD_CSV } from "@/utils/constants";

const Uploadcsv = ()  => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choose a file first");

    const form = new FormData();
    form.append("file", file);

    try {
      const { data } = await apiClient.post(UPLOAD_CSV, form, {
        withCredentials: true,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (err) {
        console.log(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Upload & Distribute CSV
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            className=" cursor-pointer block w-full text-sm border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition"
          />

          <Button
            type="submit"
            className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium rounded-lg"
          >
            Upload & Distribute
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Uploadcsv;
