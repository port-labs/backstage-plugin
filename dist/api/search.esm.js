async function search(backendApiUrl, searchQuery) {
  const response = await fetch(
    `${backendApiUrl}/api/proxy/getport/entities/search`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchQuery)
    }
  );
  const json = await response.json();
  return json.entities;
}

export { search as default };
//# sourceMappingURL=search.esm.js.map
