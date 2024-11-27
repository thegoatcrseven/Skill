// pages/api/folders/[id].js
export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === "PUT") {
      // Simuler la modification d'un dossier
      res.status(200).json({ message: `Dossier ${id} modifié avec succès` });
    } else if (req.method === "DELETE") {
      // Simuler la suppression d'un dossier
      res.status(200).json({ message: `Dossier ${id} supprimé avec succès` });
    } else {
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
  }
  