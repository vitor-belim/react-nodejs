class ResponseHelper {
  entityNotFound(res) {
    res.status(400).json({ message: "Entity not found" });
  }

  entityNotOwned(res) {
    res.status(403).json({ message: "Entity not owned" });
  }

  entityDeleted(res) {
    res.json({ message: "Entity deleted" });
  }
}

let instance = new ResponseHelper();

module.exports = instance;
