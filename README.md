# Swift Forms

**Fill your Google Forms swiftly!** ✨

Swift Forms is a project that leverages machine learning to enhance the Google Forms experience. By using a FastAPI backend with Python and a Chrome extension for the frontend, this tool allows users to quickly fill out Google Forms. 📝

## 🌟 Features

- **FastAPI Backend**: Powered by Python 3.12.7, the backend utilizes machine learning models for answering questions.
- **Chrome Extension**: A lightweight frontend component to integrate with Google Forms directly in the browser.
- **ML-Driven Responses**: Swiftly generate answers for form questions using intelligent algorithms. 🤖

## ⚙️ Prerequisites

- Python 3.12 installed
- Google Chrome browser
- A virtual environment (optional but recommended)

---

## 🚀 Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sahilsh-dev/Swift-Forms.git
   cd Swift-Forms/backend
   ```

2. Set up a virtual environment (optional but recommended):

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # For Unix/MacOS
   .venv\Scripts\activate   # For Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.py
   ```

4. Run the backend server:
   ```bash
   fastapi dev app.py
   ```
   The server should now be running at `http://127.0.0.1:8000` 🌐

### Frontend Setup

1. Navigate to the `frontend` folder in the project directory.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the `frontend` folder.
5. The Chrome extension should now be loaded and ready to use. 🎉
6. Click the extension to open a sidepanel and fill the knowlege base based on which questions will be answered.

---

## 📖 Usage

1. Launch the FastAPI backend as described above.
2. Open your browser and ensure the Swift Forms extension is active.
3. Navigate to a Google Form, and click on Fill answers in the extension sidepanel.

## 🤝 Contributing

We welcome contributions to Swift Forms! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## 📬 Contact

For any questions or support, please contact [vlsharma713@gmail.com](mailto:vlsharma713@gmail.com).

Enjoy using **Swift Forms** to make your Google Forms experience seamless! 🚀
