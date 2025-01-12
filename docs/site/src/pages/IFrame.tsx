export default function IFrame(): JSX.Element {
  return (
    <div style={{ padding: 10, border: "3px solid #e0e0e0", borderRadius: 10 }}>
      <iframe
        src="https://docs.getport.io/build-your-software-catalog/sync-data-to-catalog/#available-plug--play-integrations"
        title="Port Integrations"
        style={{ display: "block", width: "100%", height: 950 }}
      />
    </div>
  );
}
