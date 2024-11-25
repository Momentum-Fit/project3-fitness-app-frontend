function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Achieve Your Best Self with Customizable Workout Plans</h1>
          <p>
            Transform your fitness journey with workouts tailored to your goals,
            fitness level, and schedule.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="path/to/your-image.jpg" alt="Fitness Journey" />
        </div>
        </section>
        <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <h3>Select Your Goals</h3>
          <p>Choose your fitness goals like weight loss, muscle gain, or improved endurance.</p>
        </div>
        <div className="step">
          <h3>Customize Your Plan</h3>
          <p>Set preferences for workout duration, frequency, and type of exercise.</p>
        </div>
        <div className="step">
          <h3>Start Your Workouts</h3>
          <p>Get access to your tailored plan and start working out at your own pace.</p>
        </div>
        <div className="step">
          <h3>Stay Motivated</h3>
          <p>Join a community, get expert advice, and adjust your plan as needed.</p>
        </div>
      </div>
    </section>
      <section className="featured-plans">
        <h2>Featured Workout Plans</h2>
        <div className="plan-cards">
          <div className="plan-card">
            <img src="path/to/plan-image1.jpg" alt="Plan 1" />
            <h3>Beginner Burn</h3>
            <p>
              A gentle start to your fitness journey with low-impact, full-body
              workouts.
            </p>
            <button className="cta-button">Start Plan</button>
          </div>
          <div className="plan-card">
            <img src="path/to/plan-image2.jpg" alt="Plan 2" />
            <h3>HIIT for Fat Loss</h3>
            <p>
              High-intensity intervals to burn fat and build endurance quickly.
            </p>
            <button className="cta-button">Start Plan</button>
          </div>
          <div className="plan-card">
            <img src="path/to/plan-image3.jpg" alt="Plan 3" />
            <h3>Strength Surge</h3>
            <p>
              Progressive strength-building exercises to help you build muscle
              and power.
            </p>
            <button className="cta-button">Start Plan</button>
          </div>
        </div>
      </section>
      <section className="personalized-plan-generator">
        <h2>Create Your Custom Plan</h2>
        <p>
          Get a personalized workout plan based on your fitness goals, schedule,
          and preferences.
        </p>
        <button className="cta-button">Get Started</button>
      </section>
      <section className="progress-tracker">
        <h2>Track Your Progress</h2>
        <p>
          Stay motivated by tracking your workouts, calories burned, and
          strength gains. See your progress over time and achieve your fitness
          goals faster.
        </p>
        <div className="tracker-stats">
          <div className="stat-card">
            <h3>Workouts Completed</h3>
            <p>120</p>
          </div>
          <div className="stat-card">
            <h3>Calories Burned</h3>
            <p>5000</p>
          </div>
          <div className="stat-card">
            <h3>Strength Level</h3>
            <p>Intermediate</p>
          </div>
        </div>
        <button className="cta-button">Start Tracking</button>
      </section>
    </>

  );
}

export default HomePage;
