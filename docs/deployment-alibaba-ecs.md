# Deploy on Alibaba Cloud ECS

A minimal path to get the backend (and full app) running on an Alibaba Cloud instance.

## 1. Create an ECS instance
- Region: **Singapore** (matches the `dashscope-intl` endpoint and low latency from Malaysia).
- Image: **Ubuntu 22.04**, instance type `ecs.t6` or larger.
- Security group: allow inbound **22** (SSH) and **3000** (or 80 if you put Nginx in front).

## 2. Install Node + the app
```bash
ssh root@<your-ecs-public-ip>
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git
git clone https://github.com/Vengga/InternPilot-AI.git
cd InternPilot-AI
npm install
```

## 3. Configure the key and build
```bash
cp .env.example .env.local
nano .env.local        # paste DASHSCOPE_API_KEY
npm run build
```

## 4. Run persistently
```bash
npm install -g pm2
pm2 start "npm run start" --name internpilot
pm2 save
```
Visit `http://<your-ecs-public-ip>:3000`. (Optional: put Nginx + a domain + TLS in front.)

## 5. Record the proof video
A 20–40s screen capture showing the app responding from the ECS public IP, plus the ECS console
showing the running instance, is strong "backend on Alibaba Cloud" evidence.
