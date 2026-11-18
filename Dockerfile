FROM mcr.microsoft.com/playwright:v1.49.1-jammy

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Install Playwright browsers with dependencies
RUN npx playwright install --with-deps

CMD ["sleep", "infinity"]