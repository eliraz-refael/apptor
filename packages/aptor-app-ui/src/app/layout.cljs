(ns app.layout
  (:require [hx.react :as hx :refer [defnc]]
			[cljss.core :refer-macros [defstyles]]
			[app.components.top-bar :refer [app-top-bar]]
			["@material-ui/core" :as mui]))

(defstyles container-style []
  {:padding-top 20})

(defnc main-layout [{:keys [children]}]
  [:<>
   [mui/CssBaseline]
   [app-top-bar]
   [mui/Container {:className (container-style) :component "main" :maxWidth "xl"} children]])