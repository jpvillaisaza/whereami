-- elm-lang/core
import Task

-- elm-lang/geolocation
import Geolocation exposing (Location)

-- elm-lang/html
import Html exposing (Html)
import Html.Events


type alias Model =
  Result Geolocation.Error (Maybe Location)


type Msg
  = RequestUpdate
  | Update (Result Geolocation.Error Location)


init : (Model, Cmd Msg)
init =
  ( Ok Nothing
  , requestLocation
  )


requestLocation : Cmd Msg
requestLocation =
  Task.attempt Update Geolocation.now


subscriptions : Model -> Sub Msg
subscriptions model =
  Geolocation.changes (Update << Ok)


view : Model -> Html Msg
view model =
  Html.div
    []
    [ Html.h1
        []
        [ Html.text "Where Am I?" ]
    , Html.div
        []
        [ Html.text (toString model) ]
    , Html.button
        [ Html.Events.onClick RequestUpdate ]
        [ Html.text "Update" ]
    ]


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    RequestUpdate ->
      ( model
      , requestLocation
      )

    Update result ->
      ( Result.map Just result
      , Cmd.none
      )


main : Program Never Model Msg
main =
  Html.program
    { init = init
    , subscriptions = subscriptions
    , update = update
    , view = view
    }
