# SYSTEM_DESIGN.md

## Overview

This document defines a production-grade movie ticket booking system aligned with BookMyShow-style requirements. The design focuses on:

- strong consistency for seat booking
- high concurrency handling
- Redis-based seat locking
- secure payment orchestration
- real-time seat availability updates
- horizontally scalable backend architecture

## Architecture Summary

### Components

- API Server: Node.js + Express, stateless
- Database: MongoDB for durable persistence
- Cache / Lock Store: Redis for seat lock TTL and fast availability checks
- Real-time Layer: Socket.io for seat state broadcast
- Payment Gateway: Stripe or Razorpay
- Background Worker: cleanup expired locks/bookings and payment reconciliation

### Design Principles

- Never trust frontend seat state
- Use backend seat validation and atomic operations
- Prioritize consistency for booking correctness
- Keep API servers stateless for horizontal scaling
- Use indexes for search and filter performance

## Recommended Folder Structure
Server/
  src/
    config/
      mongo.js
      redis.js
      payment.js
    controllers/
      authController.js
      bookingController.js
      movieController.js
      showController.js
    services/
      authService.js
      bookingService.js
      seatService.js
      paymentService.js
    models/
      movieModel.js
      theatreModel.js
      screenModel.js
      showModel.js
      bookingModel.js
      userModel.js
    middlewares/
      auth.js
      errorHandler.js
      validateRequest.js
    routes/
      authRoutes.js
      movieRoutes.js
      showRoutes.js
      bookingRoutes.js
    sockets/
      seatSocket.js
    workers/
      cleanupWorker.js
  app.js
  index.js
  
## Data Model Design

### Movie

- `title`
- `description`
- `duration`
- `language`
- `genre`
- `releaseDate`
- `formats`
- `posterUrl`

### Theatre

- `name`
- `address`
- `city`
- `location`

### Screen

- `theatreId`
- `name`
- `totalSeats`
- `seatLayout`
  - row
  - seatId
  - category

### Show

- `movieId`
- `theatreId`
- `screenId`
- `startTime`
- `endTime`
- `language`
- `format`
- `seatPricing`
- `totalSeats`
- `availableSeats`
- `bookedSeats`
- `status` (`active`, `cancelled`, `housefull`)

Indexes:
- `movieId`
- `theatreId`
- `startTime`
- `city`
- `status`

### Booking

- `userId`
- `showId`
- `seats`
- `totalAmount`
- `paymentId`
- `status`
  - `INITIATED`
  - `PENDING_PAYMENT`
  - `CONFIRMED`
  - `FAILED`
  - `EXPIRED`
- `createdAt`
- `expiresAt`
- `idempotencyKey`

### User

- `username`
- `email`
- `hash_password`
- `location`
- booking history via lookup in `bookings`
- JWT-authenticated sessions

## Seat Management

### Seat States

- `AVAILABLE`
- `LOCKED`
- `BOOKED`

### Locking Strategy

- Use Redis keys: `lock:show:{showId}:seat:{seatId}`
- Acquire all requested seats atomically
- TTL of 5–10 minutes for seat locks
- Use Redis transactions or Lua scripts for multi-seat atomicity
- Create booking draft only after successful lock acquisition

### Booking Guarantee

- Lock seats before the user pays
- Keep seat state authoritative only in backend
- Release locks on payment failure or timeout
- Use background cleanup for stale locks and expired booking drafts

## Booking Lifecycle

### Flow

1. `INITIATED`
   - user selects seats
   - backend validates and locks seats
2. `PENDING_PAYMENT`
   - create booking draft
   - generate payment order
3. `CONFIRMED`
   - payment verified
   - seats marked booked
   - booking finalized
4. `FAILED`
   - payment failed
   - release seat locks
5. `EXPIRED`
   - lock TTL expired
   - pending booking canceled automatically

### Consistency

- Use MongoDB atomic updates or transactions when updating booking and show seat state
- Ensure no two bookings can claim the same seats
- Do not perform seat state mutation in frontend

## API Design

### Authentication

- `POST /api/user/register`
- `POST /api/user/login`

### Movie & Show Discovery

- `GET /api/movie`
- `GET /api/movie/:id`
- `GET /api/show`
- `GET /api/show/:id`
- `GET /api/show/:id/seats`

### Seat Locking

- `POST /api/show/:id/lock`
- `POST /api/show/:id/unlock`

### Booking

- `POST /api/bookings`
- `POST /api/bookings/:id/pay`
- `POST /api/bookings/:id/confirm`
- `GET /api/bookings/user`

### Payments

- `POST /api/payments/verify`
- `POST /api/payments/webhook`

## Search & Discovery

### Filters

- city
- movie
- language
- genre
- date/time

### Pagination

- always paginate large result sets
- use limit/offset or cursor-based pagination

## Real-time Updates

- Socket.io for seat lock/unlock/book events
- Keep seat availability current in UI
- Polling fallback for clients without WebSocket support

## Failure Handling

- Payment failure → release locks, update booking status
- Server crash → background worker recovers pending bookings and locks
- Lock expiration → return seats to availability
- Payment webhook → handle asynchronous confirmation safely

## Scalability Strategy

- Stateless API servers
- Redis for high-frequency seat operations
- MongoDB indexes for search
- Background worker for cleanup tasks
- Horizontal scaling behind a load balancer
- Optional: separate read path for discovery/search traffic

## Immediate Improvements for Your Repo

- Fix `app.use(cors)` to `app.use(cors())`
- Add `app.use(express.json())`
- Make login a `POST` endpoint
- Use consistent password field naming in `User` model
- Add Redis seat-lock service
- Add JWT middleware for booking and seat endpoints
- Add payment flow and webhook support
- Add proper route implementations for movies, shows, and bookings

## Production-ready Checklist

- auth and authorization in place
- seat lock TTL and cleanup
- booking lifecycle states implemented
- payment verification and webhook handling
- search filters and indexes
- real-time seat update support
- horizontal scaling enabled
- consistent backend seat validation
