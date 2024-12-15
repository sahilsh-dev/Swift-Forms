# Swift Forms

**Fill your Google Forms swiftly!** ✨

Swift Forms is a project that leverages machine learning to enhance the Google Forms experience. By using a FastAPI backend with Python and a Chrome extension for the frontend, this tool allows users to quickly fill out Google Forms. 📝

## 🌟 Features

- **FastAPI Backend**: Powered by Python 3.12.7, the backend utilizes machine learning models for answering questions.
- **Chrome Extension**: A lightweight frontend component to integrate with Google Forms directly in the browser.
- **ML-Driven Responses**: Swiftly generate answers for form questions using intelligent algorithms. 🤖

## ⚙️ Backend Setup

### Python Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sahilsh-dev/Swift-Forms.git
   cd Swift-Forms/backend
   ```

2. Install dependencies:

   <details>
   <summary><strong>uv (recommended)</strong></summary>

   You can install uv from [here](https://docs.astral.sh/uv/getting-started/installation/)

   ```bash
   uv sync

   source .venv/bin/activate  # For Unix/MacOS
   .venv\Scripts\activate   # For Windows
   ```

   </details>

   <details>
   <summary><strong>pip</strong></summary>
   Make sure you have python 3.12 installed      

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # For Unix/MacOS
   .venv\Scripts\activate   # For Windows

   pip install -r requirements.txt
   ```
   
   </details>

3. Run the backend server:
   ```bash
   fastapi dev app.py
   ```
   The server should now be running at http://127.0.0.1:8000

### Docker Installation 🐳

1. **Install Docker**:  
   Follow the official [Docker installation guide](https://docs.docker.com/get-docker/) for your operating system.

2. **Build the Docker Image**:  
   Run the following command to build the Docker image:
   ```bash
   docker build -t swiftforms-server .
   ```

3. **Run the Docker Container**:  
   Use the following command to start the container:
   ```bash
   docker run -v hf-models:/cache/huggingface -p 8000:8000 -it swiftforms-server
   ```

4. **Access the Application**:  
   Open your browser and navigate to http://localhost:8000

> [!NOTE] 
> For Windows Users 🪟
> - Ensure that Docker Desktop is installed and running.
> - If you need to map a specific directory to the container (instead of using a named volume), use the Windows-style absolute path for the `-v` flag:
> ```
> docker run -v C:\path\to\cache:/cache/huggingface -p 8000:8000 -it swiftforms-server
> ```

## 💻 Frontend Setup

1. Navigate to the `frontend` folder in the project directory.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the `frontend` folder.
5. The Chrome extension should now be loaded and ready to use. 🎉
6. Click the extension to open a sidepanel and fill the knowlege base based on which questions will be answered.

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

For any questions or support, you can [contact](mailto:vlsharma713@gmail.com) me.

Enjoy using **Swift Forms** to make your Google Forms experience seamless! 🚀
