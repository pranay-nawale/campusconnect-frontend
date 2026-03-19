function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 text-gray-400 px-10 py-10">

      <div className="grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-white">
            CampusConnect
          </h2>
          <p className="mt-2">
            Discover and participate in college events across campuses.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Links</h3>

          <ul className="space-y-1">
            <li>Events</li>
            <li>Colleges</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">
            Follow Us
          </h3>

          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>

      </div>

      <div className="text-center mt-10 text-sm">
        © 2026 CampusConnect. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;