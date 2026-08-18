"use client";

import { useState, useMemo } from "react";
import creatorsData from "@/app/creators.json"; // Adjust path if creators.json is in src/data/ or app/

type Creator = {
  id: string | number;
  avatar_url: string;
  name: string;
  handle: string;
  niche: string;
  tier: string;
  subscribers: number;
  avg_views: number;
  engagement_rate: number;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [sortField, setSortField] = useState<keyof Creator | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Extract unique niches dynamically
  const uniqueNiches = useMemo(() => {
    const niches = creatorsData.map((c: any) => c.niche);
    return ["All", ...Array.from(new Set(niches))];
  }, []);

  const tiers = ["All", "nano", "micro", "mid", "top"];

  // Handle column header clicks for sorting
  const handleSort = (field: keyof Creator) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort creator data
  const filteredCreators = useMemo(() => {
    return (creatorsData as Creator[])
      .filter((creator) => {
        const matchesSearch = creator.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesNiche =
          selectedNiche === "All" || creator.niche === selectedNiche;
        const matchesTier =
          selectedTier === "All" ||
          creator.tier.toLowerCase() === selectedTier.toLowerCase();
        return matchesSearch && matchesNiche && matchesTier;
      })
      .sort((a, b) => {
        if (!sortField) return 0;
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, selectedNiche, selectedTier, sortField, sortDirection]);

  return (
    <main
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Creator Directory</h1>

      {/* Controls: Search & Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by creator name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1 1 200px",
          }}
        />

        <select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1 1 150px",
          }}
        >
          {uniqueNiches.map((niche) => (
            <option key={niche} value={niche}>
              Niche: {niche}
            </option>
          ))}
        </select>

        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1 1 150px",
          }}
        >
          {tiers.map((tier) => (
            <option key={tier} value={tier}>
              Tier: {tier}
            </option>
          ))}
        </select>
      </div>

      {/* Responsive Table Wrapper */}
      <div
        style={{
          overflowX: "auto",
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "600px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f5f5f5",
                borderBottom: "2px solid #ddd",
              }}
            >
              <th style={{ padding: "12px" }}>Avatar</th>
              <th style={{ padding: "12px" }}>Name & Handle</th>
              <th style={{ padding: "12px" }}>Niche</th>
              <th style={{ padding: "12px" }}>Tier</th>
              <th
                onClick={() => handleSort("subscribers")}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Subscribers{" "}
                {sortField === "subscribers"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : "↕"}
              </th>
              <th
                onClick={() => handleSort("avg_views")}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Avg Views{" "}
                {sortField === "avg_views"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : "↕"}
              </th>
              <th
                onClick={() => handleSort("engagement_rate")}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Engagement Rate{" "}
                {sortField === "engagement_rate"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : "↕"}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCreators.length > 0 ? (
              filteredCreators.map((creator, index) => (
                <tr
                  key={creator.id || index}
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <td style={{ padding: "12px" }}>
                    <img
                      src={creator.avatar_url}
                      alt={creator.name}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </td>
                  <td style={{ padding: "12px" }}>
                    <strong>{creator.name}</strong>
                    <br />
                    <span style={{ color: "#666", fontSize: "0.85em" }}>
                      @{creator.handle}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>{creator.niche}</td>
                  <td style={{ padding: "12px", textTransform: "capitalize" }}>
                    {creator.tier}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {creator.subscribers?.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {creator.avg_views?.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {typeof creator.engagement_rate === "number"
                      ? `${(creator.engagement_rate * 100).toFixed(2)}%`
                      : creator.engagement_rate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  No creators match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
