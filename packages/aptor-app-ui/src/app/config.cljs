(ns app.config)

(def app-config
  {:dev-server "http://localhost:3001"})

(def api-map
  {:agendas (str (:dev-server app-config) "/api/agendas")
   :get-users (str (:dev-server app-config) "/api/users")})
