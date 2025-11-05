  const chatsContainer = document.querySelector(".chats-container");
        const promptForm = document.querySelector(".prompt-form");
        const promptInput = promptForm.querySelector(".prompt-input");
        const fileInput = promptForm.querySelector("#file-input");
        const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
        const filePreview = fileUploadWrapper.querySelector(".file-preview");
        const sendPromptBtn = document.querySelector("#send-prompt-btn");
        const API_URL = `https://missaoui-ocr-fastapi.hf.space`;
        
        const userData = { message: "", file: {} };

        const createMessageElement = (content, ...classes) => {
            const div = document.createElement("div");
            div.classList.add("message", ...classes);
            div.innerHTML = content;
            return div;
        };

        const scrollToBottom = () => {
            chatsContainer.scrollTop = chatsContainer.scrollHeight;
        };

        const generateResponse = async (botMsgDiv) => {
            const textElement = botMsgDiv.querySelector(".message-text");

            try {
                if (!userData.file || !userData.file.data) {
                    throw new Error("Please upload an image file before sending.");
                }

                const formData = new FormData();
                formData.append("file", userData.file.data); 
                const response = await fetch(`${API_URL}/ocr-image/`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Failed to process the image.");
                }

                const blob = await response.blob();
                const pdfUrl = URL.createObjectURL(blob);

                textElement.innerHTML = `
                    <strong>Download your receipt</strong><br><br>
                    <a href="${pdfUrl}" download="receipt.pdf" class="download-link" target="_blank">Download Receipt PDF</a>
                `;

            } catch (error) {
                textElement.textContent = error.message;
                textElement.style.color = "#d62939";
            } finally {
                userData.file = {};
                sendPromptBtn.disabled = true;
                scrollToBottom();
            }
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            
            if (!userData.file.data) return;
            
            const userMessage = promptInput.value.trim();
            userData.message = userMessage;
            promptInput.value = "";
            fileUploadWrapper.classList.remove("active");
            
            const userMsgHTML = `
                ${userData.file.data ? `<img src="${URL.createObjectURL(userData.file.data)}" class="img-attachment" />` : ""}
            `;
            const userMsgDiv = createMessageElement(userMsgHTML, "user-message");
            chatsContainer.appendChild(userMsgDiv);
            scrollToBottom();
            
            setTimeout(() => {
                const botMsgHTML = `<img class="avatar" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDI3LjVDMjEuOTAzNiAyNy41IDI3LjUgMjEuOTAzNiAyNy41IDE1QzI3LjUgOC4wOTY0NCAyMS45MDM2IDIuNSAxNSAyLjVDOC4wOTY0NCAyLjUgMi41IDguMDk2NDQgMi41IDE1QzIuNSAyMS45MDM2IDguMDk2NDQgMjcuNSAxNSAyNy41WiIgc3Ryb2tlPSIjMTBhMzdmIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTAgMTJIMjBNMTAgMTZIMjBNMTAgMjBIMTcuNSIgc3Ryb2tlPSIjMTBhMzdmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" /> <p class="message-text">Processing your image...</p>`;
                const botMsgDiv = createMessageElement(botMsgHTML, "bot-message");
                chatsContainer.appendChild(botMsgDiv);
                scrollToBottom();
                generateResponse(botMsgDiv);
            }, 600); 
        };

        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file) return;
            
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file (JPEG, PNG, etc.)");
                return;
            }
            
            filePreview.src = URL.createObjectURL(file);
            fileUploadWrapper.classList.add("active");
            
            userData.file = { data: file, fileName: file.name, mime_type: file.type };
            
            sendPromptBtn.disabled = false;
        });

        

        promptForm.addEventListener("submit", handleFormSubmit);
        promptForm.querySelector("#add-file-btn").addEventListener("click", () => fileInput.click());
