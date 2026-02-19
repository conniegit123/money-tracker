# Git Configuration for GitHub

## Step 1: Configure Git with Your GitHub Account

Open PowerShell or Command Prompt and run these commands:

### Set your Git username (use your GitHub username):
```bash
git config --global user.name "conniegit123"
```

### Set your Git email (use the email associated with your GitHub account):
```bash
git config --global user.email "your-email@example.com"
```

**Important:** Replace `your-email@example.com` with the email address you used when creating your GitHub account.

### Verify your configuration:
```bash
git config --global user.name
git config --global user.email
```

## Step 2: Authentication Options

You have two options for authenticating with GitHub:

### Option A: Personal Access Token (Recommended for HTTPS)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "expense-tracker")
4. Select scopes: at minimum check `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

When you push/pull, use your token as the password:
- Username: `conniegit123`
- Password: `your-personal-access-token`

### Option B: SSH Keys (More Secure)

1. Generate an SSH key:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```
   - Press Enter to accept default file location
   - Enter a passphrase (optional but recommended)

2. Start the ssh-agent:
```bash
eval "$(ssh-agent -s)"
```

3. Add your SSH key to the ssh-agent:
```bash
ssh-add ~/.ssh/id_ed25519
```

4. Copy your public key:
```bash
cat ~/.ssh/id_ed25519.pub
```
   - Copy the entire output

5. Add to GitHub:
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key
   - Click "Add SSH key"

6. Update your remote URL to use SSH:
```bash
cd "c:\Connie\WebApp\expense tracker"
git remote set-url origin git@github.com:conniegit123/money-tracker.git
```

## Step 3: Test Your Configuration

After setting up authentication, test it:

```bash
cd "c:\Connie\WebApp\expense tracker"
git pull
```

If everything is configured correctly, it should work without errors.

## Quick Reference Commands

```bash
# View current git config
git config --global --list

# View repository-specific config
git config --list

# Change remote URL to HTTPS
git remote set-url origin https://github.com/conniegit123/money-tracker.git

# Change remote URL to SSH
git remote set-url origin git@github.com:conniegit123/money-tracker.git

# View current remote URL
git remote -v
```
