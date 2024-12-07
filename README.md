<div align="left" style="position: relative;">
<img src="https://cdn.discordapp.com/attachments/1201423611857207326/1314955891522408539/logo.png?ex=6755a79b&is=6754561b&hm=a61b525939930e4a7e2280cf8600c719928024a326ff50ad7cf3e3bc3bfd9f57&" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>NUXTGEMINI</h1>
<p align="left">
</p>
<p align="left">
	<img src="https://img.shields.io/github/last-commit/Vertixx01/nuxtgemini?style=default&logo=git&logoColor=white&color=35e416" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Vertixx01/nuxtgemini?style=default&color=35e416" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Vertixx01/nuxtgemini?style=default&color=35e416" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

- Just a simple chatbot UI
- Built with Nuxt 3, TypeScript, Google Gemini and Tailwind CSS

---

## 👾 Features

- Chat with different personalities
- Manage personalities
- Generate new personalities
- Chat with ChatBot

---

## 📁 Project Structure

```sh
└── nuxtgemini/
    ├── README.md
    ├── app.vue
    ├── assets
    │   └── css
    ├── bun.lockb
    ├── components
    │   ├── ChatInterface.vue
    │   ├── PersonalityModal.vue
    │   └── Sidebar.vue
    ├── nuxt.config.ts
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── logo.png
    │   ├── robots.txt
    │   └── user.png
    ├── server
    │   └── tsconfig.json
    ├── stores
    │   ├── chats.ts
    │   ├── messages.ts
    │   ├── personalities.ts
    │   └── settings.ts
    ├── tailwind.config.js
    └── tsconfig.json
```


### 📂 Project Index
<details open>
	<summary><b><code>NUXTGEMINI/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ Dependency lock file ensuring consistent installations</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/nuxt.config.ts'>nuxt.config.ts</a></b></td>
				<td><code>❯ Nuxt.js configuration file with TailwindCSS and Pinia setup</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td><code>❯ TypeScript configuration for the project</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/tailwind.config.js'>tailwind.config.js</a></b></td>
				<td><code>❯ TailwindCSS configuration for styling</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/app.vue'>app.vue</a></b></td>
				<td><code>❯ Root Vue component of the application</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ Project metadata and dependencies including Nuxt.js, Google AI, and UI libraries</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- components Submodule -->
		<summary><b>components</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/components/ChatInterface.vue'>ChatInterface.vue</a></b></td>
				<td><code>❯ Main chat interface component handling message display and interaction</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/components/PersonalityModal.vue'>PersonalityModal.vue</a></b></td>
				<td><code>❯ Modal component for managing and creating chat personalities</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/components/Sidebar.vue'>Sidebar.vue</a></b></td>
				<td><code>❯ Sidebar component for chat navigation and personality selection</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- public Submodule -->
		<summary><b>public</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/public/robots.txt'>robots.txt</a></b></td>
				<td><code>❯ Search engine crawling configuration file</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- server Submodule -->
		<summary><b>server</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/server/tsconfig.json'>tsconfig.json</a></b></td>
				<td><code>❯ Server-side TypeScript configuration</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- stores Submodule -->
		<summary><b>stores</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/stores/settings.ts'>settings.ts</a></b></td>
				<td><code>❯ Pinia store for application settings management</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/stores/messages.ts'>messages.ts</a></b></td>
				<td><code>❯ Pinia store for chat messages state management</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/stores/personalities.ts'>personalities.ts</a></b></td>
				<td><code>❯ Pinia store for managing chat personalities</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Vertixx01/nuxtgemini/blob/master/stores/chats.ts'>chats.ts</a></b></td>
				<td><code>❯ Pinia store for managing chat sessions</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---
## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with nuxtgemini, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Bun


### ⚙️ Installation

Install nuxtgemini using one of the following methods:

**Build from source:**

1. Clone the nuxtgemini repository:
```sh
❯ git clone https://github.com/Vertixx01/nuxtgemini
```

2. Navigate to the project directory:
```sh
❯ cd nuxtgemini
```

3. Install the project dependencies:


**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ bun install
```




### 🤖 Usage
Run nuxtgemini using the following command:
**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ bun dev
```


---
## 📌 Project Roadmap

- [X] **`Task 1`**: <strike>Basic functionality</strike>
- [ ] **`Task 2`**: Make the UI more visually appealing.
- [ ] **`Task 3`**: Add additional features.
- [ ] **`Task 4`**: Integrate with more LLM Providers or services.
- [ ] **`Task 5`**: Optimize performance.

---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/Vertixx01/nuxtgemini/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Vertixx01/nuxtgemini/issues)**: Submit bugs found or log feature requests for the `nuxtgemini` project.
- **💡 [Submit Pull Requests](https://github.com/Vertixx01/nuxtgemini/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Vertixx01/nuxtgemini
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Vertixx01/nuxtgemini/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Vertixx01/nuxtgemini">
   </a>
</p>
</details>


## 🙌 Acknowledgments

- **[Vertixx01](https://github.com/Vertixx01)**: For creating this project.
- Hopefully, this project will be useful to you.

---