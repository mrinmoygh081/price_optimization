let users = [{ id: 1, name: "Alice", email: "alice@example.com" }];

exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};
