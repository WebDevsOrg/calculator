# Ensure the .gitattributes file is committed
git add .gitattributes
git commit -m "Add .gitattributes for line ending normalization"

# Normalize all files in the repository
git rm --cached -r .
git reset --hard

git add --renormalize .
git commit -m "Normalize all files according to .gitattributes"
