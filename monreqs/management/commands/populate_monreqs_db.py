from random import randint, choice

from django.forms.models import model_to_dict
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model 

from ...models import MonitoringRequest


def gen_mock_monreqs(how_many: int):
    super_user = get_user_model().objects.get(pk=1)
    monreqs = []
    for n in range(how_many):
        shipping_company = f"TransportadoraUser {n}"
        status = choice(MonitoringRequest.Status.values)
        vehicle_type = choice(MonitoringRequest.VehicleType.values)
        cargo_descrip = f"Carga {n}"
        cargo_value = randint(10000,100000)
        for_user_pick = randint(0,1)
        monreq = MonitoringRequest.objects.create(
            status = status,
            shipping_company=shipping_company,
            vehicle=vehicle_type,
            cargo_description=cargo_descrip,
            cargo_value= cargo_value
        )
        if for_user_pick: monreq.logins.add(super_user) 
        monreqs.append(monreq)
    return monreqs

class Command(BaseCommand):

    def handle(self, *args, **options) -> None:
        monreqs = gen_mock_monreqs(20)
        for mr_dict in (model_to_dict(mr) for mr in monreqs):
            print(mr_dict)
            self.stdout.write(
                "\n".join(
                    [f"{k.capitalize().replace('_',' ')}:{v}" for (k,v) in mr_dict.items()]
                )
            )

