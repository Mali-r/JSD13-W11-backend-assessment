# My Understanding

Answer each question in your own words. There are no trick questions.

The goal is not a perfect answer — it is an honest one. Write as if you are explaining to a friend who has never used Express or React. There is no video for this assessment, so this document is where your understanding is actually assessed — take it seriously.

Do not copy from documentation, your code comments, or AI output. If you are unsure about something, write what you do understand and note where the gap is.

---

## AI Code Contribution

Rate yourself honestly using the scale below. This rating is not scored on its own — there is no "best" number to pick. What matters is that it's honest and matches what your code and your answers actually show.

| Rating | Description |
|---|---|
| 0 | **No AI use.** I did not use AI to generate code, explain concepts, debug, or teach me. |
| 1 | **AI used only for learning.** I did not use AI to generate code, but I used AI to explain concepts, clarify errors, or guide my understanding. |
| 2 | **Mixed coding with AI support.** I wrote some code myself and used some AI-generated code. I also used AI to help me understand, debug, or improve my solution. |
| 3 | **Learned from AI-generated code, then coded myself.** AI generated example code or guidance, but I used that understanding to write or adapt the final code myself. |
| 4 | **AI generated the code, but I fully understand it.** AI generated most or all of the code, but I can explain how it works, why it works, and how the main parts connect. |
| 5 | **AI generated the code with limited understanding.** AI generated most or all of the code, and I cannot confidently explain how or why everything works. |

**My rating:** | 2 |

> If you rated **2 or higher**, also complete the "AI Process" section at the end of this document.

---

## Backend

**1. What does each HTTP method in your API mean — GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?**

เพราะเราต้องเจาะจงว่าเราจะทำอะไรกับ data บ้าง เเละต้องชี้ไปที่ endpoint ที่ถูกต้อง ถึงจะจัดการกับ data ได้ตามที่ต้องการ 

---

**2. What is `express.json()` and what would happen if you left it out?**

เป็นการติดตั้ง Middleware ให้สามารถเข้าใจ json เเละส่ง data เป็น json ได้

---

**3. What is the difference between `req.body`, `req.params`, and `req.query`? Give a real example from your API for each one.**

`req.body` คือดึง object-key value pair สามารถ Destructuring ได้ จากตัวอย่าง

// Create product

router.post("/", (req, res, next) => {
  try {
    const { name, price, quantity } = req.body; 

`req.params` ดึง key ใน object ออกมาจาก Path Variable จากตัวอย่าง

// Update product

router.put("/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

`req.query` ส่วนตัวนี้ไม่ได้ใช้ค่ะ ใน assessment นี้ เเต่ตัวนี้จะดึง object มาจาก url query string

---

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

res.status(500) = Centralized Error Handling middleware เมื่อไม่สามารถ req/res ได้
res.status(400) = ค่าไม่ตรงกับ condition ที่ตั้งไว้
res.status(201) = การสร้าง data ใหม่ สำเร็จ
res.status(404) = ไม่มีค่านี้ในระบบ
res.status(200) = สิ่งที่ทำกับ data ที่มีอยู๋ สำเร็จ

---

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

middleware = เส้นทางของ data ไปสู่ endpoint เพื่อจุดประสงค์อะไรสักอย่าง ณ จุดนั้น
ตัวอย่าง

// index.js

import { router as productRoutes } from "./products.routes.js";

export const router = Router();

router.use("/products", productRoutes);
                ^สร้าง route ไปสู่ endpoint >> local/products

// products.routes

// Read products
router.get("/", (req, res, next) => {});
            ^end point >> local/products

// Update product
router.put("/:id", (req, res, next) => {});
            ^endpoint >> local/products/1

---

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

ชีวิตเปลี่ยน

---

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

res.status(201).json(newProduct); ถ้าผ่านเงื่อนไขที่ตั้งไว้

---

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

// Read products

router.get("/", () => {});

// Create product

router.post("/", () => {});

// Update product

router.put("/:id", () => {});

// Delete products

router.delete("/:id", () => {});


---

**9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?**

return res.status(404).json({ error: "Product not found!"});

---

## Frontend & Integration

**10. What is CORS, and what problem does it solve? What would you see in your browser if it wasn't configured on your server?**

CORS = ประตูสำหรับ Frontend ที่กำหนดไว้เเล้วว่าเป็นใครสามารถผ่านประตูนี้ได้บ้าง ถ้าไม่มีก้ไม่สามารถเข้าไปทำอะไรกับ data ได้

---

**11. Where does your React app fetch data from your API? Walk through what `useEffect` is doing in that code, and why the fetch isn't just called directly in the component body.**

เป้นการดึง data มาไว้ ทำนู่นนี่นั้นต่อ

---

**12. Where is your API's base URL defined, and why did you put it there instead of hardcoding it in every fetch call?**

// .env

VITE_API_URL = http://localhost:3001/

ประหยัดเวลาเเก้ไข code 

---

**13. Pick one action in your app — for example, deleting a product. Walk through the full round trip: what happens from the moment the user clicks the button, to the request reaching your server, to the screen updating with the new list.**

Delete button -> onClick={() => handleDelete(product.id)} -> deleteProduct(id); ->  request(`/products/${id}`, {method: "DELETE",});

---

**14. What does your app show the user while data is loading, and what does it show if the fetch fails (e.g. the server isn't running)? Why does that matter?**

ทำให้รู้ว่ายังมี response อยุ่ เเล้วรู้ว่า web กำลังทำอะไร

---

**15. After you add, edit, or delete a product, your on-screen list updates without a page refresh. Explain how — what actually causes React to re-render with the new data?**

loadProducts(); >>
  async function loadProducts() {
    try {
      setError("");
      setProducts(await getProducts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

---

**16. What was the hardest part of connecting your React app to your Express API, and what did you do to get past it?**

the handle function like i have to code it again from backend it's take time so i use ai for guiding me through that from my base code

---

## AI Process

Only complete this section if you rated yourself **2 or higher** on the AI Code Contribution Scale above. If you rated 0 or 1, write "N/A" under each question.

**17. If you used AI to generate any code, how did you break the work into steps or prompts? Give one example of a specific prompt you used, rather than a single "build the whole app" request.**

เเค่ถามจุดที่เช็กเเล้วหาไม่เจอว่าพลาดตรงไหน scope ให้ ai ช่วยดูเป็นจุดๆไป บ้างครั้ง Logic เราอาจจะยังไม่ครอบคลุม เช่น 
// Delete products
if (index === -1) ตอนเเรกเป็น if(!index) เเต่พอรันเเล้วไม่ได้ค่า id=1 เพราะว่ามันเป้น index [0,1,2] เพราะงั้นถ้า id=1 มันจะได้เป้น 0 มาเลยหาไม่เจอ 
prompt: Delete products ทำไมลบ id: 1 ไม่ได้คะ เริ่มลบได้ที่ id:2

---

**18. Describe one specific thing an AI tool generated that you changed, corrected, or rejected — and why.**

มีเเค่ปรับใช้ เพราะ scope เเล้วว่าจะเอาเท่านี้ เป้นจุดๆ ตามที่ต้องการอยู่
ที่ปรับเพราะ ui ไม่ถูกใจ
---

**19. Describe one real bug or error you ran into while building this. How did you actually figure out what was wrong, beyond pasting the error back into the chat?**

ROUTES PATH
ตอนเเรกเลย error มันขึ้นว่าไม่เจออะไรเลย เลยเปิดไล่ดู เเต่ละ route เเล้วลอง ใส่จาก /products -> /products/products เเล้วมันขึ้น เพราะไปเห้นว่าใน index ก้มี หน้า products ก้มี เลยเเก้ใส่เเค่หน้า index พอ cleanๆ 
---

**20. Pick one route (backend) or one component (frontend) that AI helped generate. Without looking back at your AI chat history, explain what it does and why it works, in your own words.**

Frontend: loadProducts(); จากที่หน้า web ต้องเเสดง product list อยุ่ตลอดเเล้วพอมีการเพิ่ม/เเก้ไขมันก้ต้อง update ตามไปด้วย เเต่ไม่รุ้ว่ามันทำยังไงเลยได้เป็นตัวนี้มา ทำให้ Product list ดู dynamic ขึ้นจากการที่เมื่อมีการ CRUD เเล้วจะไป get /products ล่าสุดมาเพื่อ update ตัว List

