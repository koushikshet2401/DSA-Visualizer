const { bubbleSortSteps, selectionSortSteps } = require("../helpers/sort");

exports.sortAlgorithm = (req, res) => {
  try {
    const type = req.params.type;
    const arr = req.body.arr;

    if (!Array.isArray(arr)) {
      return res.status(400).json({ message: "arr must be array" });
    }

    let steps;

    if (type === "bubble") steps = bubbleSortSteps(arr);
    else if (type === "selection") steps = selectionSortSteps(arr);
    else return res.status(400).json({ message: "Invalid sort type" });

    res.set("X-Algorithm", type);
    return res.status(200).json({ steps });

  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};
