let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  const searchLower = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchLower));
}

function longestNote() {
  if (notes.length === 0) return null;
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

function countByCategory() {
  let counts = {};
  for (let note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

function getSummary() {
  let counts = countByCategory();
  let total = notes.length;
  let noun = total === 1 ? "note" : "notes";
  
  let details = [];
  for (let cat in counts) {
    details.push(${counts[cat]} );
  }
  
  return ${total} : .;
}

function isDuplicate(text) {
  let cleanText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  
  if (text.length < 1 || text.length > 200) {
    console.log("Failed to add: Note must be 1-200 characters.");
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log("Failed to add: Category must be personal, work, or study.");
    return false;
  }
  if (isDuplicate(text)) {
    console.log("Failed to add: Duplicate note.");
    return false;
  }
  
  const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: text, category: category });
  return true;
}

// --- TESTS ---

// 1. searchNotes
console.log("searchNotes('day'):", searchNotes("day")); // Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
console.log("searchNotes('xyz'):", searchNotes("xyz")); // Expected: [] (Empty array)

// 2. longestNote
console.log("longestNote():", longestNote()); // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
let tempNotes1 = [...notes]; notes = []; // temporarily empty array
console.log("longestNote() empty array:", longestNote()); // Expected: null
notes = [...tempNotes1]; // restore array

// 3. countByCategory
console.log("countByCategory():", countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }
let tempNotes2 = [...notes]; notes = [];
console.log("countByCategory() empty array:", countByCategory()); // Expected: {}
notes = [...tempNotes2];

// 4. getSummary
console.log("getSummary():", getSummary()); // Expected: "5 notes: 2 personal, 2 study, 1 work."
let tempNotes3 = [...notes]; notes = [{ id: 1, text: "Single item", category: "personal" }];
console.log("getSummary() single item:", getSummary()); // Expected: "1 note: 1 personal."
notes = [...tempNotes3];

// 5. isDuplicate
console.log("isDuplicate('Call mum'):", isDuplicate("Call mum")); // Expected: true
console.log("isDuplicate('  cALl mUm  '):", isDuplicate("  cALl mUm  ")); // Expected: true (ignores case and padding spaces)
console.log("isDuplicate('Buy apples'):", isDuplicate("Buy apples")); // Expected: false

// 6. addNote
console.log("addNote normal:", addNote("Buy apples", "personal")); // Expected: true
console.log("addNote duplicate:", addNote("Call mum", "personal")); // Expected: false (logs 'Duplicate note.')
console.log("addNote invalid length:", addNote("", "work")); // Expected: false (logs 'Note must be 1-200 characters.')
console.log("addNote invalid category:", addNote("Test", "hobby")); // Expected: false (logs 'Category must be personal, work, or study.')
