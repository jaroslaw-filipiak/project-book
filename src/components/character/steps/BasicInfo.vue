<template>
  <div class="basic-info-step">
    <h2>Let's start with basic information</h2>

    <form>
      <div class="form-group">
        <label>Name</label>
        <input type="text" required />
      </div>

      <div class="form-group">
        <label>Gender</label>
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="actions">
        <button type="submit">Next</button>
      </div>
    </form>
  </div>
</template>
