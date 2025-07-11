import AuthCard from "../components/AuthCard";

function page() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .auth-layout {
            flex-direction: column !important;
          }
          .auth-illustration {
            display: none !important;
          }
        }
      `}</style>
      <div className="auth-layout" style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Left: Auth form */}
        <div style={{ flex: 1, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AuthCard />
        </div>
        {/* Right: Illustration */}
        <div className="auth-illustration" style={{ flex: 1, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' ,margin:"20px" , borderRadius:"20px"}}>
          <img src="/assets/Login-img.jpg" alt="Login Illustration" style={{ maxWidth: '80%', maxHeight: '80%', borderRadius: '1.5rem', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)' }} />
        </div>
      </div>
    </>
  );
}

export default page;