try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json(); 
      setError(errorData.error || "Une erreur est survenue.");
      return;
    }
  
    const data = await response.json();
    alert(data.message || "Inscription réussie !");
    router.push("/login");
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    setError("Erreur réseau. Veuillez réessayer.");
  }
  