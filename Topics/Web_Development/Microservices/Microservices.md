# Microservices

1. [Basic Microservice (React App)](#basic-microservice-react-app)

### Basic Microservice (React App)

##### [Start](#)

1. [Initial Setup](#initial-setup)

---

#### Initial Setup

<br>

Dir setup

```powershell
$ mkdir blog
blog $ mkdir client posts comments
```

1. Create a new React App

   ```powershell
   blog/client $ npx create-react-app client
   ```

2. Express based posts service

   ```powershell
   blog/posts $ npm i express cors axios
   ```

3. Express based comments service

   ```powershell
   blog/comments $ npm i express cors axios
   ```
