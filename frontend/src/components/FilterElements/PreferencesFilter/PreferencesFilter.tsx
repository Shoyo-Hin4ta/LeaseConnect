import { Button } from "@/components/ui/button"

const PreferencesFilter = () => {
  return (
    <div className="my-2">
        <div>
            Preferences
        </div>
        <div>
            <div className="flex flex-wrap gap-2">
                <Button>Pets Allowed</Button>
                <Button>Smoking</Button>
                <Button>Drinking</Button>
                <Button>Only Students</Button>
                <Button>Only Working</Button>
                <Button>Only Girls </Button>
                <Button>Vegetarian </Button>
                <Button>Non-Vegetarian </Button>
            </div>
        </div>
        <div>
            Amentities
        </div>
        <div className="flex flex-wrap gap-2">
            <Button>Pool</Button>
            <Button>Gym</Button>
            <Button>Parking</Button>
            <Button>Gym</Button>
            <Button>Only Working</Button>
        </div>
    </div>
  )
}

export default PreferencesFilter