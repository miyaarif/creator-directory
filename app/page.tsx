import creators from "@/app/creators.json";
export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Creator Directory</h1>
      <table
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Avatar</th>
            <th>Name & Handle</th>
            <th>Niche</th>
            <th>Tier</th>
            <th>Subscribers</th>
            <th>Avg Views</th>
            <th>Engagement Rate</th>
          </tr>
        </thead>
        <tbody>
          {creators.map((creator: any, index: number) => (
            <tr key={creator.id || index}>
              <td>
                <img
                  src={creator.avatar_url}
                  alt={creator.name}
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </td>
              <td>
                <strong>{creator.name}</strong>
                <br />
                <span style={{ color: "#666", fontSize: "0.85em" }}>
                  @{creator.handle}
                </span>
              </td>
              <td>{creator.niche}</td>
              <td>{creator.tier}</td>
              <td>{creator.subscribers}</td>
              <td>{creator.avg_views}</td>
              <td>{creator.engagement_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
